import '../../brands/models/brand.dart';
import '../../enums/vehicle_type.dart';

class Model {
  late int id;
  late int brandId;
  late Brand brand;
  late String name;
  late String description;
  late VehicleType type;
  late DateTime productionStart;
  late DateTime productionEnd;
  late bool productionEnded;

  Model();

  Model.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    brandId = json['brandId'];
    brand = json['brand'];
    name = json['name'];
    description = json['description'];
    type = json['type'];
    productionStart = json['productionStart'];
    productionEnd = json['productionEnd'];
    productionEnded = json['productionEnded'];
  }
  
}
