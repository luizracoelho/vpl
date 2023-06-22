import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../../../../models/models/model.dart';
import '../../../states/vehicle_flow_state.dart';

class ModelListTile extends StatelessWidget {
  const ModelListTile({super.key, required this.model, required this.vehicleState});

  final Model model;
  final VehicleFlowState vehicleState;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: CircleAvatar(backgroundImage: NetworkImage(model.brandLogo)),
      title: Text(model.brandName),
      trailing: const Icon(Icons.chevron_right),
      onTap: () {
        vehicleState.selectModel(model);
        Navigator.of(context).pushNamed('/vehicles');
      },
    );
  }
}
