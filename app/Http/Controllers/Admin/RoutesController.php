<?php
// app/Http/Controllers/Admin/RoutesController.php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RoutesController extends Controller
{
    // index method to return the admin dashboard view
    public function index()
    {
        return inertia('Admin/Dashboard');
    }
    public function SignIn()
    {
        return inertia('Admin/pages/AuthPages/SignIn');
    }
    public function SignUp()
    {
        return inertia('Admin/pages/AuthPages/SignUp');
    }
    public function BarChart()
    {
        return inertia('Admin/pages/Charts/BarChart');
    }
    public function LineChart()
    {
        return inertia('Admin/pages/Charts/LineChart');
    }
    public function Ecommerce()
    {
        return inertia('Admin/pages/Dashboard/Ecommerce');
    }
    public function FormElements()
    {
        return inertia('Admin/pages/Forms/FormElements');
    }
    public function Blank()
    {
        return inertia('Admin/pages/OtherPage/Blank');
    }
    public function NotFound()
    {
        return inertia('Admin/pages/OtherPage/NotFound');
    }
    public function BasicTables()
    {
        return inertia('Admin/pages/Tables/BasicTables');
    }
    public function Alerts()
    {
        return inertia('Admin/pages/UiElements/Alerts');
    }
    public function Avatar()
    {
        return inertia('Admin/pages/UiElements/Avatars');
    }
    public function Badges()
    {
        return inertia('Admin/pages/UiElements/Badges');
    }
    public function Buttons()
    {
        return inertia('Admin/pages/UiElements/Buttons');
    }
    public function Images()
    {
        return inertia('Admin/pages/UiElements/Images');
    }
    public function Videos()
    {
        return inertia('Admin/pages/UiElements/Videos');
    }
    public function Calendar()
    {
        return inertia('Admin/pages/Calendar');
    }
    public function Profile()
    {
        return inertia('Admin/pages/UserProfiles');
    }
}
