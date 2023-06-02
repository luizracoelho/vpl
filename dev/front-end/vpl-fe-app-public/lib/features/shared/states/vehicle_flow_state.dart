import 'package:flutter/material.dart';
import 'package:vpl/features/brands/models/brand.dart';
import 'package:vpl/features/vehicles/models/vehicle.dart';

import '../../models/models/model.dart';

class VehicleFlowState extends ChangeNotifier {
  Brand? brand;
  Model? model;
  Vehicle? vehicle;

  void selectBrand(Brand brand) {
    this.brand = brand;

    notifyListeners();
  }

  void selectModel(Model model) {
    this.model = model;

    notifyListeners();
  }

  void selectVehicle(Vehicle vehicle) {
    this.vehicle = vehicle;

    notifyListeners();
  }

  void clear() {
    brand = null;
    model = null;
    vehicle = null;

    notifyListeners();
  }
}
