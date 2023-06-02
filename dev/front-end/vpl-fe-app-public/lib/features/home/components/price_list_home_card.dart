import 'package:flutter/material.dart';
import 'package:vpl/features/home/components/home_card.dart';
import 'package:vpl/features/referenceYears/enums/price_reference.dart';

class PriceListHomeCard extends HomeCard {
  final PriceReference priceReference;

  const PriceListHomeCard({
    super.key,
    required this.priceReference,
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
    priceListState.selectPriceReference(priceReference);

    Navigator.of(context).pushNamed(route);
  }
}
