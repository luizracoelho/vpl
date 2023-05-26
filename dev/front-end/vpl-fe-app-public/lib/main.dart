import 'package:flutter/material.dart';
import 'package:vpl/routes.dart';

import 'features/home/pages/home_page.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      debugShowMaterialGrid: false,
      title: 'VPL',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.yellowAccent,
          brightness: Brightness.light,
        ),
        textTheme: const TextTheme(
          bodyLarge: TextStyle(
            color: Colors.blue,
          ),
        ),
        useMaterial3: true,
      ),
      routes: routes,
      home: const HomePage(),
    );
  }
}
