<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Team\GetTeamMembers;
use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class TeamController extends Controller
{
    public function index(GetTeamMembers $action): Response
    {
        return Inertia::render('admin/team/index', [
            'members' => $action->execute(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/team/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'position' => ['required', 'string', 'max:255'],
            'bio' => ['nullable', 'string'],
            'photo' => ['nullable', 'image', 'max:2048'],
            'order' => ['required', 'integer', 'min:0'],
            'is_active' => ['boolean'],
        ]);

        if ($request->hasFile('photo')) {
            $validated['photo'] = $request->file('photo')->store('team', 'public');
        }

        Team::create($validated);

        return redirect()->route('admin.team.index')
            ->with('success', 'Team member added.');
    }

    public function edit(Team $team): Response
    {
        return Inertia::render('admin/team/edit', [
            'member' => $team,
        ]);
    }

    public function update(Request $request, Team $team): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'position' => ['required', 'string', 'max:255'],
            'bio' => ['nullable', 'string'],
            'photo' => ['nullable', 'image', 'max:2048'],
            'order' => ['required', 'integer', 'min:0'],
            'is_active' => ['boolean'],
        ]);

        if ($request->hasFile('photo')) {
            if ($team->photo) {
                Storage::disk('public')->delete($team->photo);
            }
            $validated['photo'] = $request->file('photo')->store('team', 'public');
        }

        $team->update($validated);

        return redirect()->route('admin.team.index')
            ->with('success', 'Team member updated.');
    }

    public function destroy(Team $team): RedirectResponse
    {
        if ($team->photo) {
            Storage::disk('public')->delete($team->photo);
        }

        $team->delete();

        return redirect()->route('admin.team.index')
            ->with('success', 'Team member deleted.');
    }
}
