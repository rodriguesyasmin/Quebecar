<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VoitureController;
use App\Http\Controllers\UtilisateurController;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
*/
// Route public vers la page d'accueil
Route::get('/', [VoitureController::class, 'index'])->name('Accueil');

// Routes authentifiés
Route::middleware([EnsureFrontendRequestsAreStateful::class, 'auth:sanctum'])->group(function () {
    //  Routes pour le VoituresController
    Route::resource('/voitures', VoitureController::class)->except(['index', 'show']);

    // Routes pour le UtilisateursController
    Route::resource('/utilisateurs', UtilisateurController::class);
});