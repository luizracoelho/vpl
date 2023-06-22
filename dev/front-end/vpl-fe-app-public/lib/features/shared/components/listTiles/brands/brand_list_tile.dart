import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../../../../brands/models/brand.dart';
import '../../../states/vehicle_flow_state.dart';

class BrandListTile extends StatelessWidget {
  const BrandListTile({super.key, required this.brand, required this.vehicleState});

  final Brand brand;
  final VehicleFlowState vehicleState;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: CircleAvatar(backgroundImage: NetworkImage(brand.logo)),
      title: Text(brand.name),
      trailing: const Icon(Icons.chevron_right),
      onTap: () {
        vehicleState.selectBrand(brand);
        Navigator.of(context).pushNamed('/models');
      },
    );
  }
}
