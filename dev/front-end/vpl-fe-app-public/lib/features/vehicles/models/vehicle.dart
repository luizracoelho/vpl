import 'package:vpl/features/vehicles/enums/vehicle_type.dart';

class Vehicle {
  late int id;
  late int brandId;
  late String brandName;
  late String brandLogo;
  late int modelId;
  late String model;
  late String name;
  late int productionYear;
  late int modelYear;
  late VehicleType type;

  Vehicle();

  Vehicle.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    brandId = json['brandId'];
    brandName = json['brandName'];
    brandLogo = json['brandLogo'];
    modelId = json['modelId'];
    model = json['model'];
    name = json['name'];
    productionYear = json['productionYear'];
    modelYear = json['modelYear'];
    type = VehicleType.values[json['type']];
  }
}
