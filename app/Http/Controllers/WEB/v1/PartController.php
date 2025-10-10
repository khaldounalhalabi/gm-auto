<?php

namespace App\Http\Controllers\WEB\v1;

use App\Http\Controllers\WebController;
use App\Services\v1\Part\PartService;

class PartController extends WebController
{
    private PartService $partService;

    public function __construct()
    {
        $this->partService = PartService::make();
        // place the relations you want to return them within the response
        $this->relations = [];
    }
}
