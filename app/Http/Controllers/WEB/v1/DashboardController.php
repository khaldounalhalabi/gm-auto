<?php

namespace App\Http\Controllers\WEB\v1;

use App\Http\Controllers\WebController;
use App\Models\AnnualScan;
use App\Models\Car;
use App\Models\Client;
use App\Models\Visit;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends WebController
{
    public function index()
    {
        // Get statistics data
        $totalClients = Client::count();
        $totalCars = Car::count();
        $totalVisits = Visit::count();

        // Get recent visits with client and car info
        $recentVisits = Visit::with(['client', 'car'])
            ->orderBy('date', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($visit) {
                return [
                    'id' => $visit->id,
                    'date' => $visit->date,
                    'client' => [
                        'id' => $visit->client->id,
                        'full_name' => $visit->client->full_name,
                    ],
                    'car' => [
                        'id' => $visit->car->id,
                        'model_name' => $visit->car->model_name,
                        'registration_plate' => $visit->car->registration_plate,
                    ],
                    'total_cost' => $visit->total_cost,
                ];
            });

        // Get top clients by visit count and total spent
        $topClients = Client::select('clients.id', 'clients.full_name')
            ->addSelect(DB::raw('COUNT(visits.id) as visit_count'))
            ->addSelect(DB::raw('SUM(visits.total_cost) as total_spent'))
            ->leftJoin('visits', 'clients.id', '=', 'visits.client_id')
            ->groupBy('clients.id', 'clients.full_name')
            ->orderBy('visit_count', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($client) {
                return [
                    'id' => $client->id,
                    'full_name' => $client->full_name,
                    'visit_count' => $client->visit_count,
                    'total_spent' => $client->total_spent ?? 0,
                ];
            });

        // Get upcoming MOT scans (annual scans) for the current week
        $now = Carbon::now();
        $weekStart = $now->copy()->startOfWeek();
        $weekEnd = $now->copy()->endOfWeek();

        // Get cars with MOT scans expiring this week
        $upcomingMOTs = AnnualScan::select(
                'cars.id as car_id',
                'cars.model_name',
                'cars.registration_plate',
                'clients.id as client_id',
                'clients.full_name as client_name',
                'clients.phone as client_phone',
                'annual_scans.expiry_date'
            )
            ->join('cars', 'cars.id', '=', 'annual_scans.car_id')
            ->join('clients', 'clients.id', '=', 'cars.client_id')
            ->whereBetween('annual_scans.expiry_date', [
                $weekStart->format('Y-m-d H:i:s'), 
                $weekEnd->format('Y-m-d H:i:s')
            ])
            ->orderBy('annual_scans.expiry_date')
            ->limit(10)
            ->get()
            ->map(function ($scan) {
                return [
                    'car_id' => $scan->car_id,
                    'model_name' => $scan->model_name,
                    'registration_plate' => $scan->registration_plate,
                    'client_id' => $scan->client_id,
                    'client_name' => $scan->client_name,
                    'client_phone' => $scan->client_phone,
                    'last_scan_date' => null,
                    'expiry_date' => $scan->expiry_date
                ];
            });

        return Inertia::render('index', [
            'stats' => [
                'totalClients' => $totalClients,
                'totalCars' => $totalCars,
                'totalVisits' => $totalVisits,
                'recentVisits' => $recentVisits,
                'topClients' => $topClients,
                'upcomingMOTs' => $upcomingMOTs,
            ],
        ]);
    }
}