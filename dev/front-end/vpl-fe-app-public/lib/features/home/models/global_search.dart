import 'package:vpl/features/brands/models/brand.dart';
import 'package:vpl/features/models/models/model.dart';
import 'package:vpl/features/vehicles/models/vehicle.dart';

class GlobalSearch {
  List<Brand>? brands;
  List<Model>? models;
  List<Vehicle>? vehicles;

  GlobalSearch.fromJson(Map<String, dynamic> json) {
    if (json['brands'] != null) {
      brands = [];

      for (var brand in json['brands']) {
        brands!.add(Brand.fromJson(brand));
      }
    }

    if (json['models'] != null) {
      models = [];

      for (var model in json['models']) {
        models!.add(Model.fromJson(model));
      }
    }

    if (json['vehicles'] != null) {
      vehicles = [];

      for (var vehicle in json['vehicles']) {
        vehicles!.add(Vehicle.fromJson(vehicle));
      }
    }
  }
}
