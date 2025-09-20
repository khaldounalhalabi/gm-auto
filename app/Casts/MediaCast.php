<?php

namespace App\Casts;

use App\Serializers\SerializedMedia;
use Exception;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class MediaCast implements CastsAttributes
{
    public bool $withoutObjectCaching = true;
    private readonly bool $private;

    public function __construct(string $privateOrPublic = "public")
    {
        $this->private = $privateOrPublic == "private";
    }

    /**
     * Cast the given value.
     * @param array<string, mixed> $attributes
     * @throws Exception
     */
    public function get(Model $model, string $key, mixed $value, array $attributes): SerializedMedia|array|null
    {
        if (is_null($value)) {
            return null;
        }

        $data = json_decode($value, true);

        if (!is_array($data)) {
            throw new Exception("Invalid stored data in the media column [$key] , table : {$model->getTable()}");
        }

        if (SerializedMedia::isMediaArray($data)) {
            $file = new SerializedMedia($data, $model->getTable(), $this->private);
            if (!$file->exists()) {
                return null;
            }
            return $file;
        }

        return array_values(
            array_values(
                array_map(function (array $item) use ($model) {
                    $file = new SerializedMedia($item, $model->getTable(), $this->private);
                    if (!$file->exists()) {
                        return null;
                    }
                    return $file;
                }, $data
                )
            )
        );
    }

    /**
     * Prepare the given value for storage.
     * @param array<string, mixed> $attributes
     * @throws Exception
     */
    public function set(Model $model, string $key, mixed $value, array $attributes): string|null|false
    {
        if (is_null($value)) {
            $model->{$key}?->delete();
            return null;
        }

        if (Str::isJson($value)) {
            $value = json_decode($value, true);
        }

        if ($value instanceof SerializedMedia) {
            if (!$value->exists()) {
                return null;
            }

            return $value->toJson();
        }

        if ($value instanceof UploadedFile) {
            $file = new SerializedMedia($value, $model->getTable(), $this->private);
            if (!$file->exists()) {
                return null;
            }
            return $file->toJson();
        }

        if (is_array($value) && SerializedMedia::isMediaArray($value)) {
            $file = new SerializedMedia($value, $model->getTable(), $this->private);
            if (!$file->exists()) {
                return null;
            }
            return $file->toJson();
        }

        if (!is_array($value)) {
            throw ValidationException::withMessages([
                $key => [
                    "Invalid stored data in the media column [$key]"
                ]
            ]);
        }

        $stored = [];
        foreach ($value as $item) {
            if (SerializedMedia::isMediaArray($item) || $item instanceof UploadedFile) {
                $file = new SerializedMedia($item, $model->getTable(), $this->private);
                if (!$file->exists()) {
                    $stored[] = $file->toArray();
                }
            } elseif ($item instanceof SerializedMedia) {
                if ($item->exists()) {
                    $stored[] = $item->toArray();
                }
            }
        }

        return json_encode($stored, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    }

    private static function deleteFileByUrl(string $url): void
    {
        $path = str_replace(asset('storage/'), '', $url);
        $fullPath = storage_path("app/public/$path");
        if (file_exists($fullPath)) {
            unlink($fullPath);
        }
    }

    public static function deleteFiles(array $media): void
    {
        if (isset($media['url'])) {
            self::deleteFileByUrl($media['url']);
        } else {
            foreach ($media as $file) {
                if (is_array($file) && isset($file['url'])) {
                    self::deleteFileByUrl($file['url']);
                }
            }
        }
    }
}
