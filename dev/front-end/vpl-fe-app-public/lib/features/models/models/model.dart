class Model {
  late int id;
  late int brandId;
  late String brandName;
  late String brandLogo;
  late String name;
  late String description;
  late int type;
  late DateTime productionStart;
  DateTime? productionEnd;
  late bool productionEnded;

  Model();

  Model.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    brandId = json['brandId'];
    brandName = json['brandName'];
    brandLogo = json['brandLogo'];
    name = json['name'];
    description = json['description'];
    type = json['type'];
    productionStart = DateTime.parse(json['productionStart']);
    productionEnd = json['productionEnd'] != null ? DateTime.parse(json['productionEnd']) : null;
    productionEnded = !!json['productionEnded'];
  }
}
