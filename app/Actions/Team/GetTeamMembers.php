<?php

namespace App\Actions\Team;

use App\Models\Team;
use Illuminate\Database\Eloquent\Collection;

class GetTeamMembers
{
    public function execute(): Collection
    {
        return Team::orderBy('order')->get();
    }
}
