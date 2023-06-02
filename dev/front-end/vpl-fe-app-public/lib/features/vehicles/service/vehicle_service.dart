import 'package:dio/dio.dart';
import 'package:vpl/features/referenceYears/enums/price_reference.dart';
import 'package:vpl/features/vehicles/models/vehicle_detail.dart';

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

  listByPriceReferenceYear(PriceReference priceReference, int year) async {
    var dio = Dio();
    List<Vehicle> vehicles = [];

    final response = await dio.get(
      '${Environment.apiUrl}/vehicles/vehicles/${priceReference.value}/$year',
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

  Future<VehicleDetail?> detail(int vehicleId, PriceReference? priceReference) async {
    var dio = Dio();

    var url = '${Environment.apiUrl}/prices/evaluations/listById/$vehicleId';

    if (priceReference != null) {
      url += '/${priceReference.value}';
    }

    final response = await dio.get(url);

    if (response.statusCode == 200) {
      return VehicleDetail.fromJson(response.data);
    } else {
      return null;
    }
  }
}
