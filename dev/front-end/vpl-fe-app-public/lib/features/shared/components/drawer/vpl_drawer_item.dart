import 'package:flutter/material.dart';

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
    return ListTile(
      title: Text(title, style: Theme.of(context).textTheme.headlineSmall),
      subtitle: Text(subtitle ?? ''),
      leading: CircleAvatar(
        child: Icon(icon),
      ),
      trailing: const Icon(Icons.chevron_right),
      onTap: () {
        Navigator.of(context).pushReplacementNamed(
          route,
        );
      },
    );
  }
}
