import 'package:flutter/material.dart';
import 'package:vpl/features/home/components/home_card.dart';

class VehicleHomeCard extends HomeCard {
  const VehicleHomeCard({
    super.key,
    required super.vehicleState,
    required super.priceListState,
    required super.title,
    required super.icon,
    required super.route,
    super.subtitle,
  });

  @override
  onTap(BuildContext context) {
    vehicleState.clear();
    priceListState.clear();

    Navigator.of(context).pushReplacementNamed(route);
  }
}
