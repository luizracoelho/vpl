import 'dart:ui';

import 'package:provider/provider.dart';
import 'package:provider/single_child_widget.dart';
import 'package:vpl/features/referenceYears/states/reference_years_list_state.dart';
import 'package:vpl/features/shared/states/price_list_flow_state.dart';

import 'features/brands/states/brands_list_state.dart';
import 'features/models/states/models_list_state.dart';
import 'features/shared/states/vehicle_flow_state.dart';
import 'features/shared/states/theme_state.dart';
import 'features/vehicles/states/vehicle_detail_state.dart';
import 'features/vehicles/states/vehicle_list_state.dart';

final List<SingleChildWidget> providers = [
  ChangeNotifierProvider(create: (_) => ThemeState(Brightness.dark)),
  ChangeNotifierProvider(create: (_) => VehicleFlowState()),
  ChangeNotifierProvider(create: (_) => PriceListFlowState()),
  ChangeNotifierProvider(create: (_) => BrandsListState()),
  ChangeNotifierProvider(create: (_) => ModelsListState()),
  ChangeNotifierProvider(create: (_) => VehicleListState()),
  ChangeNotifierProvider(create: (_) => VehicleDetailState()),
  ChangeNotifierProvider(create: (_) => VehicleListState()),
  ChangeNotifierProvider(create: (_) => ReferenceYearsListState()),
];
