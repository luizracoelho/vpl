import 'package:flutter/material.dart';
import 'package:vpl/features/referenceYears/enums/price_reference.dart';
import 'package:vpl/features/vehicles/models/vehicle.dart';

class PriceListFlowState extends ChangeNotifier {
  PriceReference? priceReference;
  int? year;
  Vehicle? vehicle;

  void selectPriceReference(PriceReference priceReference) {
    this.priceReference = priceReference;

    notifyListeners();
  }

  void selectYear(int year) {
    this.year = year;

    notifyListeners();
  }

  void selectVehicle(Vehicle vehicle) {
    this.vehicle = vehicle;

    notifyListeners();
  }

  void clear() {
    priceReference = null;
    year = null;
    vehicle = null;

    notifyListeners();
  }
}
