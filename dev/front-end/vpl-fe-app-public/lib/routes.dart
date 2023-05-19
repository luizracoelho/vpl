import 'package:vpl/features/brands/pages/brands_list_page.dart';
import 'package:vpl/features/home/pages/home_page.dart';
import 'package:vpl/features/models/pages/models_list_page.dart';
import 'package:vpl/features/referenceYears/pages/reference_year_list_page.dart';
import 'package:vpl/features/vehicles/pages/vehicles_list_page.dart';

final routes = {
  '/home': (context) => const HomePage(),
  '/brands': (context) => const BrandsListPage(),
  '/brands/models': (context) => const ModelsListPage(),
  '/models': (context) => const ModelsListPage(),
  '/vehicles': (context) => const VehiclesListPage(),
  '/references': (context) => const ReferenceYearsListPage(),
};
