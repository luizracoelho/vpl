import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:vpl/features/evaluations/models/evaluation.dart';

class MyLineChart extends StatelessWidget {
  final List<Evaluation> evaluations;
  final Color color;
  final BoxConstraints constraints;

  const MyLineChart(this.evaluations, this.color, this.constraints, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      height: constraints.maxHeight / 2.5,
      child: LineChart(
        LineChartData(
          lineBarsData: [
            LineChartBarData(
              barWidth: 5,
              color: color,
              spots:
                  evaluations.asMap().entries.map((entry) => FlSpot(entry.key.toDouble(), entry.value.value)).toList(),
              dotData: const FlDotData(show: true),
            ),
          ],
          titlesData: FlTitlesData(
            show: true,
            bottomTitles: AxisTitles(
                sideTitles: SideTitles(
                    showTitles: true,
                    getTitlesWidget: (value, meta) {
                      return Text(evaluations[value.toInt()].year.toString());
                    },
                    interval: 1)),
            topTitles: const AxisTitles(
              sideTitles: SideTitles(showTitles: false),
            ),
            rightTitles: const AxisTitles(
              sideTitles: SideTitles(showTitles: false),
            ),
          ),
        ),
      ),
    );
  }
}
