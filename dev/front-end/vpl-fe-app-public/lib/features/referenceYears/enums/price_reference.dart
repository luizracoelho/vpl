enum PriceReference {
  Fipe,
  Molicar,
}

extension PriceReferenceExtension on PriceReference {
  String get description {
    switch (this) {
      case PriceReference.Fipe:
        return 'Fipe';
      case PriceReference.Molicar:
        return 'Molicar';
      default:
        return '';
    }
  }

  int get value {
    switch (this) {
      case PriceReference.Fipe:
        return 1;
      case PriceReference.Molicar:
        return 2;
      default:
        return 0;
    }
  }
}
