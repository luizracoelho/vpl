class Brand {
  late int id;
  late String name;
  late String logo;

  Brand();

  Brand.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    name = json['name'];
    logo = json['logo'];
  }
}
