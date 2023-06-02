import 'package:flutter/material.dart';
import 'package:vpl/features/referenceYears/enums/price_reference.dart';
import 'package:vpl/features/shared/states/price_list_flow_state.dart';
import 'package:vpl/features/shared/states/vehicle_flow_state.dart';

abstract class HomeCard extends StatelessWidget {
  final String title;
  final String? subtitle;
  final IconData icon;
  final String route;
  final VehicleFlowState vehicleState;
  final PriceListFlowState priceListState;

  const HomeCard({
    super.key,
    required this.vehicleState,
    required this.priceListState,
    required this.title,
    required this.icon,
    required this.route,
    this.subtitle,
  });

  onTap(BuildContext context) {
    throw Exception('Method not implemented');
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => onTap(context),
      child: Padding(
        padding: const EdgeInsets.only(right: 8.0),
        child: Card(
          child: SizedBox(
            width: 250,
            height: 100,
            child: Center(
              child: ListTile(
                leading: CircleAvatar(
                  child: Icon(
                    icon,
                  ),
                ),
                title: Text(
                  title,
                ),
                subtitle: Text(subtitle ?? ''),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
