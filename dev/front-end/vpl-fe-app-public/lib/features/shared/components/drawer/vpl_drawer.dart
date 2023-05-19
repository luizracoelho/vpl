import 'package:flutter/material.dart';
import 'package:vpl/features/shared/components/drawer/vpl_drawer_item.dart';

class VplDrawer extends StatelessWidget {
  const VplDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          DrawerHeader(
            decoration: BoxDecoration(
              color: Theme.of(context).primaryColor,
            ),
            child: Text('Drawer Header', style: Theme.of(context).textTheme.headlineLarge),
          ),
          const VplDrawerItem(
            title: 'Home',
            subtitle: 'Acesse a home',
            icon: Icons.house_outlined,
            route: '/home',
          ),
          const Divider(),
          const VplDrawerItem(
            title: 'Marcas',
            subtitle: 'Acesse as marcas',
            icon: Icons.flag_circle_outlined,
            route: '/brands',
          ),
          const Divider(),
          const VplDrawerItem(
            title: 'Modelos',
            subtitle: 'Acesse os modelos',
            icon: Icons.sell_outlined,
            route: '/models',
          ),
          const Divider(),
          const VplDrawerItem(
            title: 'Veículos',
            subtitle: 'Acesse os veículos',
            icon: Icons.directions_car_outlined,
            route: '/vehicles',
          ),
          const Divider(),
        ],
      ),
    );
  }
}
