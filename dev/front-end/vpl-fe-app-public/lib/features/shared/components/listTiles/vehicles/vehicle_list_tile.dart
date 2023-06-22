import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:vpl/features/shared/states/price_list_flow_state.dart';
import 'package:vpl/features/vehicles/models/vehicle.dart';

import '../../../states/vehicle_flow_state.dart';

class VehicleListTile extends StatelessWidget {
  const VehicleListTile({
    super.key,
    required this.vehicle,
    required this.vehicleFlowState,
    required this.priceListFlowState,
  });

  final Vehicle vehicle;
  final VehicleFlowState vehicleFlowState;
  final PriceListFlowState priceListFlowState;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: CircleAvatar(
        backgroundImage: NetworkImage(vehicle.brandLogo),
      ),
      title: Text(vehicle.name),
      trailing: const Icon(Icons.chevron_right),
      onTap: () {
        if (priceListFlowState.year != null) {
          priceListFlowState.selectVehicle(vehicle);
        } else {
          vehicleFlowState.selectVehicle(vehicle);
        }

        Navigator.of(context).pushNamed('/vehicles/details');
      },
    );
  }
}
