import 'package:flutter/material.dart';
import 'package:vpl/features/referenceYears/enums/price_reference.dart';
import 'package:vpl/features/vehicles/models/vehicle_detail.dart';

import '../service/vehicle_service.dart';

class VehicleDetailState extends ChangeNotifier {
  VehicleDetail? vehicleDetail;

  Future<void> getDetail(int vehicleId, PriceReference? priceReference) async {
    vehicleDetail = await VehicleService.instance.detail(vehicleId, priceReference);
  }
}
