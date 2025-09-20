<?php

namespace App\Serializers;

use Closure;
use Exception;
use GuzzleHttp\Psr7\MimeType;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use JsonSerializable;
use Stringable;

class SerializedMedia implements Arrayable, Jsonable, JsonSerializable, Stringable
{
    private UploadedFile $file;
    public readonly string $url;
    public readonly string $extension;
    public readonly string $mimeType;
    public readonly int $size;
    public readonly string $dir;
    public readonly bool $private;
    public readonly string $path;

    /**
     * @param UploadedFile|array{url:string,extension:string,mime_type:string,size:int, path:string} $file
     * @throws Exception
     */
    public function __construct(UploadedFile|array $file, ?string $dir = null, bool $private = false)
    {
        $this->dir = $dir ?? "";
        $this->private = $private;

        if (self::isMediaArray($file)) {
            $this->url = $file['url'];
            $this->extension = $file['extension'];
            $this->mimeType = $file['mime_type'];
            $this->size = intval($file['size']);
            $access = $this->private ? "private" : "public";
            $this->path = $file['path'] ?? str_replace(asset("/storage"), storage_path("/app/$access"), $this->url);
        } else {
            $this->file = $file;
            $path = $this->storeFile();
            $data = $this->format($path);
            $this->url = $data['url'];
            $this->size = $data['size'];
            $this->extension = $data['extension'];
            $this->mimeType = $data['mime_type'];
            $this->path = $data['full_path'];
        }
    }

    private function storeFile(): string
    {
        $access = $this->private ? "private" : "public";
        $directory = storage_path("app/$access/$this->dir");
        if (!is_dir($directory)) {
            File::makeDirectory(storage_path("app/$access/$this->dir"), 0777, true);
        }
        return $this->file->store($this->dir, [
            'disk' => $this->private ? "local" : "public",
        ]);
    }

    private function format(string $value): array
    {
        $access = $this->private ? "private" : "public";
        $fullPath = storage_path("app/$access/" . trim($value, '/'));
        $fileExists = file_exists($fullPath);
        $extension = File::extension($fullPath);
        return [
            'url' => asset("storage/$value"),
            'size' => $fileExists ? round(filesize($fullPath) / 1024) : 0,
            'extension' => $extension,
            'mime_type' => $fileExists ? MimeType::fromExtension($extension) : "unknown",
            'full_path' => $fullPath,
        ];
    }

    public static function isMediaArray(mixed $value): bool
    {
        if (!is_array($value)) {
            return false;
        }

        return isset($value['url'])
            && isset($value['extension'])
            && isset($value['mime_type'])
            && isset($value['size']);
    }

    public function delete(): bool
    {
        if (file_exists($this->path)) {
            return unlink($this->path);
        }

        return false;
    }

    public function toArray(): array
    {
        return [
            'url' => $this->url,
            'size' => $this->size,
            'extension' => $this->extension,
            'mime_type' => $this->mimeType,
            'path' => $this->path,
        ];
    }

    public function __toString(): string
    {
        return $this->toJson();
    }

    public function toJson($options = 0): string
    {
        return json_encode($this->toArray(), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    }

    public function jsonSerialize(): array
    {
        return [
            'url' => $this->url,
            'size' => $this->size,
            'extension' => $this->extension,
            'mime_type' => $this->mimeType,
        ];
    }

    public function exists(): bool
    {
        return file_exists($this->path);
    }

    public function name(): string
    {
        return pathinfo($this->path, PATHINFO_FILENAME);
    }

    /**
     * Note: default rules are for images
     * @param string[]|Closure[] $fileRules
     * @return Closure
     */
    public static function validator(array $fileRules = ['image', 'max:10000', 'mimes:jpeg,png,jpg,gif,svg,webp']): Closure
    {
        return function ($attribute, $value, $fail) use ($fileRules) {
            if (!SerializedMedia::isMediaArray($value)) {
                $fail('Invalid media array');
            }

            $file = new self($value);
            if (!$file->exists()) {
                $fail('Invalid media file');
                return;
            }

            $uploadedFile = new UploadedFile($file->path, $file->name(), $file->mimeType, null, true);
            $validator = Validator::make([
                'file' => $uploadedFile,
            ], [
                'file' => $fileRules,
            ]);

            if ($validator->fails()) {
                $fail($validator->errors()->first());
            }
        };
    }
}
