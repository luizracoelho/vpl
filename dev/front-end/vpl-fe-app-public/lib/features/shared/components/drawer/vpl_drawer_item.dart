import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:vpl/features/shared/states/primary_flow_state.dart';

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
    return Consumer<PrimaryFlowState>(builder: (context, state, child) {
      return ListTile(
        title: Text(title, style: Theme.of(context).textTheme.headlineSmall),
        subtitle: Text(subtitle ?? ''),
        leading: CircleAvatar(
          child: Icon(icon),
        ),
        trailing: const Icon(Icons.chevron_right),
        onTap: () {
          state.clear();
          Navigator.of(context).pushReplacementNamed(route);
        },
      );
    });
  }
}
