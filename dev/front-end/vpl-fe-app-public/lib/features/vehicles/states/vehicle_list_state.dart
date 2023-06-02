import 'package:flutter/material.dart';
import 'package:vpl/features/referenceYears/enums/price_reference.dart';
import 'package:vpl/features/vehicles/models/vehicle.dart';
import 'package:vpl/features/vehicles/service/vehicle_service.dart';

class VehicleListState extends ChangeNotifier {
  List<Vehicle>? vehicleList;

  Future<void> listAllVehicles() async {
    vehicleList = await VehicleService.instance.list();
  }

  Future<void> listVehiclesByModelId(int modelId) async {
    vehicleList = await VehicleService.instance.listByModelId(modelId);
  }

  void refresh() {
    notifyListeners();
  }

  Future<void> listVehiclesByPriceReferenceYear(PriceReference priceReference, int year) async {
    vehicleList = await VehicleService.instance.listByPriceReferenceYear(priceReference, year);
  }
}
