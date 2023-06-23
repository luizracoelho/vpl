import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:vpl/features/home/states/search_state.dart';
import 'package:vpl/features/shared/states/price_list_flow_state.dart';
import 'package:vpl/features/shared/states/vehicle_flow_state.dart';

class VplDrawerItem extends StatelessWidget {
  final String title;
  final String? subtitle;
  final IconData icon;
  final String route;

  const VplDrawerItem({
    super.key,
    required this.title,
    required this.icon,
    required this.route,
    this.subtitle,
  });

  @override
  Widget build(BuildContext context) {
    return Consumer<VehicleFlowState>(builder: (context, vehicleState, child) {
      return Consumer<PriceListFlowState>(builder: (context, priceListState, child) {
        return Consumer<SearchState>(builder: (context, searchState, child) {
        return ListTile(
          title: Text(title, style: Theme.of(context).textTheme.headlineSmall),
          subtitle: Text(subtitle ?? ''),
          leading: CircleAvatar(
            child: Icon(icon),
          ),
          trailing: const Icon(Icons.chevron_right),
          onTap: () {
            vehicleState.clear();
            priceListState.clear();
            searchState.clear();
            Navigator.of(context).pushReplacementNamed(route);
          },
        );
      });
    });
    });
  }
}
