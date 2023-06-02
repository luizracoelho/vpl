import 'package:dio/dio.dart';

import '../../../environment.dart';
import '../models/vehicle.dart';

class VehicleService {
  static VehicleService? _instance;

  static VehicleService get instance {
    return _instance ??= VehicleService();
  }

  Future<List<Vehicle>?> list() async {
    var dio = Dio();

    final response = await dio.get(
      '${Environment.apiUrl}/vehicles/Vehicles',
    );

    List<Vehicle> vehicles = [];

    if (response.statusCode == 200) {
      for (var item in response.data) {
        vehicles.add(Vehicle.fromJson(item));
      }

      return vehicles;
    } else {
      return null;
    }
  }

  Future<List<Vehicle>?> listByModelId(int modelId) async {
    var dio = Dio();
    List<Vehicle> vehicles = [];

    final response = await dio.get(
      '${Environment.apiUrl}/vehicles/vehicles/model/$modelId',
    );

    if (response.statusCode == 200) {
      for (var item in response.data) {
        vehicles.add(Vehicle.fromJson(item));
      }

      return vehicles;
    } else {
      return null;
    }
  }
}
