<?php

namespace App\Http\Controllers\WEB\v1;

use App\Http\Controllers\WebController;
use App\Http\Requests\v1\Client\StoreUpdateClientRequest;
use App\Http\Resources\v1\ClientResource;
use App\Models\Client;
use App\Services\v1\Client\ClientService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends WebController
{
    private ClientService $clientService;

    public function __construct()
    {
        $this->clientService = ClientService::make();
        // place the relations you want to return them within the response
        $this->relations = [];
    }

    public function data()
    {
        $items = $this->clientService->indexWithPagination($this->relations);

        return rest()
            ->ok()
            ->getSuccess()
            ->data($items)
            ->send();
    }

    public function index()
    {
        $exportables = Client::getModel()->exportable();

        return Inertia::render('dashboard/clients/index', [
            'exportables' => $exportables,
        ]);
    }

    public function show($clientId)
    {
        $client = $this->clientService->view($clientId, $this->relations);

        return Inertia::render('dashboard/clients/show', [
            'client' => ClientResource::make($client),
        ]);
    }

    public function create()
    {
        return Inertia::render('dashboard/clients/create');
    }

    public function store(StoreUpdateClientRequest $request)
    {
        $client = $this->clientService->store($request->validated(), $this->relations);
        if ($client) {
            return redirect()
                ->route('v1.web.protected.clients.index')
                ->with('success', trans('site.stored_successfully'));
        }

        return redirect()
            ->back()
            ->with('error', trans('site.something_went_wrong'));
    }

    public function edit($clientId)
    {
        $client = $this->clientService->view($clientId, $this->relations);

        if (!$client) {
            abort(404);
        }

        return Inertia::render('dashboard/clients/edit', [
            'client' => ClientResource::make($client),
        ]);
    }

    public function update(StoreUpdateClientRequest $request, $clientId)
    {
        $client = $this->clientService->update($request->validated(), $clientId, $this->relations);
        if ($client) {
            return redirect()
                ->route('v1.web.protected.clients.index')
                ->with('success', trans('site.update_successfully'));
        }

        return redirect()
            ->back()
            ->with('error', trans('site.there_is_no_data'));
    }

    public function destroy($clientId)
    {
        $result = $this->clientService->delete($clientId);

        return rest()
            ->when(
                $result,
                fn($rest) => $rest->ok()->deleteSuccess(),
                fn($rest) => $rest->noData(),
            )->send();
    }

    public function export(Request $request)
    {
        $ids = $request->ids ?? [];

        try {
            $result = $this->clientService->export($ids);
            session()->flash('success', trans('site.success'));

            return $result;
        } catch (Exception) {
            return redirect()
                ->back()
                ->with('error', trans('site.something_went_wrong'));
        }
    }

    public function getImportExample()
    {
        try {
            $result = $this->clientService->getImportExample();
            session()->flash('success', trans('site.success'));

            return $result;
        } catch (Exception) {
            return redirect()
                ->back()
                ->with('error', trans('site.something_went_wrong'));
        }
    }

    public function import(Request $request)
    {
        try {
            $request->validate(['excel_file' => 'required|mimes:xls,xlsx']);
            $this->clientService->import();

            return redirect()
                ->back()
                ->with('message', trans('site.success'));
        } catch (Exception) {
            return redirect()
                ->back()
                ->with('message', trans('site.something_went_wrong'));
        }
    }
}
