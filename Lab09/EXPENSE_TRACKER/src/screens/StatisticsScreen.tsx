import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAllExpenses } from "../database/db";

type Expense = {
  id: number;
  title: string;
  amount: number;
  createdAt: string;
  type: string;
};

type MonthlyStats = {
  month: string;
  income: number;
  expense: number;
};

export default function StatisticsScreen({ navigation }: any) {
  const [monthlyData, setMonthlyData] = useState<MonthlyStats[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    loadStatistics();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadStatistics);
    return unsubscribe;
  }, [navigation]);

  const loadStatistics = async () => {
    const expenses = (await getAllExpenses()) as Expense[];

    // Tính toán thống kê theo tháng
    const stats: { [key: string]: MonthlyStats } = {};
    let income = 0;
    let expense = 0;

    expenses.forEach((item) => {
      const date = new Date(item.createdAt);
      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      const shortMonthKey = `T${date.getMonth() + 1}`;

      if (!stats[monthKey]) {
        stats[monthKey] = {
          month: shortMonthKey,
          income: 0,
          expense: 0,
        };
      }

      if (item.type === "Thu") {
        stats[monthKey].income += item.amount;
        income += item.amount;
      } else if (item.type === "Chi") {
        stats[monthKey].expense += item.amount;
        expense += item.amount;
      }
    });

    // Lấy 6 tháng gần nhất
    const sortedData = Object.keys(stats)
      .sort()
      .reverse()
      .slice(0, 6)
      .reverse()
      .map((key) => stats[key]);

    setMonthlyData(sortedData);
    setTotalIncome(income);
    setTotalExpense(expense);
  };

  // Tìm giá trị max để scale biểu đồ
  const maxValue = Math.max(
    ...monthlyData.map((item) => Math.max(item.income, item.expense)),
    1
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>📊 THỐNG KÊ THU CHI</Text>
        </View>

        {/* Tổng quan */}
        <View style={styles.summaryContainer}>
          <View style={[styles.summaryCard, styles.incomeCard]}>
            <Text style={styles.summaryIcon}>💰</Text>
            <Text style={styles.summaryLabel}>Tổng Thu</Text>
            <Text style={styles.summaryAmount}>
              {totalIncome.toLocaleString("vi-VN")} đ
            </Text>
          </View>

          <View style={[styles.summaryCard, styles.expenseCard]}>
            <Text style={styles.summaryIcon}>💸</Text>
            <Text style={styles.summaryLabel}>Tổng Chi</Text>
            <Text style={styles.summaryAmount}>
              {totalExpense.toLocaleString("vi-VN")} đ
            </Text>
          </View>
        </View>

        <View style={[styles.summaryCard, styles.balanceCard]}>
          <Text style={styles.summaryIcon}>💵</Text>
          <Text style={styles.summaryLabel}>Số dư</Text>
          <Text
            style={[
              styles.summaryAmount,
              {
                color: totalIncome - totalExpense >= 0 ? "#27ae60" : "#e74c3c",
              },
            ]}
          >
            {(totalIncome - totalExpense).toLocaleString("vi-VN")} đ
          </Text>
        </View>

        {/* Biểu đồ Custom */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Biểu đồ Thu - Chi theo Tháng</Text>

          {monthlyData.length > 0 ? (
            <View style={styles.customChart}>
              {/* Legend */}
              <View style={styles.legend}>
                <View style={styles.legendItem}>
                  <View
                    style={[styles.legendColor, { backgroundColor: "#27ae60" }]}
                  />
                  <Text style={styles.legendText}>Thu</Text>
                </View>
                <View style={styles.legendItem}>
                  <View
                    style={[styles.legendColor, { backgroundColor: "#e74c3c" }]}
                  />
                  <Text style={styles.legendText}>Chi</Text>
                </View>
              </View>

              {/* Chart */}
              <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                <View style={styles.chartContent}>
                  {monthlyData.map((item, index) => {
                    const incomeHeight = (item.income / maxValue) * 150;
                    const expenseHeight = (item.expense / maxValue) * 150;

                    return (
                      <View key={index} style={styles.barGroup}>
                        <View style={styles.barsContainer}>
                          {/* Thu bar */}
                          <View style={styles.barWrapper}>
                            <View
                              style={[
                                styles.bar,
                                {
                                  height: incomeHeight || 5,
                                  backgroundColor: "#27ae60",
                                },
                              ]}
                            />
                          </View>

                          {/* Chi bar */}
                          <View style={styles.barWrapper}>
                            <View
                              style={[
                                styles.bar,
                                {
                                  height: expenseHeight || 5,
                                  backgroundColor: "#e74c3c",
                                },
                              ]}
                            />
                          </View>
                        </View>

                        {/* Month label */}
                        <Text style={styles.monthLabel}>{item.month}</Text>
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          ) : (
            <View style={styles.emptyChart}>
              <Text style={styles.emptyText}>📊</Text>
              <Text style={styles.emptyMessage}>Chưa có dữ liệu thống kê</Text>
            </View>
          )}
        </View>

        {/* Chi tiết theo tháng */}
        <View style={styles.detailContainer}>
          <Text style={styles.detailTitle}>Chi tiết theo tháng</Text>
          {monthlyData.length > 0 ? (
            monthlyData.map((item, index) => (
              <View key={index} style={styles.detailCard}>
                <Text style={styles.detailMonth}>{item.month}</Text>
                <View style={styles.detailRow}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>💰 Thu:</Text>
                    <Text style={[styles.detailAmount, { color: "#27ae60" }]}>
                      {item.income.toLocaleString("vi-VN")} đ
                    </Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>💸 Chi:</Text>
                    <Text style={[styles.detailAmount, { color: "#e74c3c" }]}>
                      {item.expense.toLocaleString("vi-VN")} đ
                    </Text>
                  </View>
                </View>
                <View style={styles.detailBalance}>
                  <Text style={styles.detailLabel}>Số dư:</Text>
                  <Text
                    style={[
                      styles.detailAmount,
                      {
                        color:
                          item.income - item.expense >= 0
                            ? "#27ae60"
                            : "#e74c3c",
                        fontWeight: "bold",
                      },
                    ]}
                  >
                    {(item.income - item.expense).toLocaleString("vi-VN")} đ
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyMessage}>Chưa có dữ liệu</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    backgroundColor: "#4a90e2",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  summaryContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  incomeCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#27ae60",
  },
  expenseCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#e74c3c",
  },
  balanceCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#4a90e2",
    marginBottom: 20,
  },
  summaryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  chartContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  customChart: {
    marginVertical: 10,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    gap: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  chartContent: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    paddingBottom: 10,
    minWidth: 400,
  },
  barGroup: {
    alignItems: "center",
    marginHorizontal: 12,
  },
  barsContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 160,
    gap: 8,
    marginBottom: 8,
  },
  barWrapper: {
    width: 30,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  bar: {
    width: 30,
    borderRadius: 4,
    minHeight: 5,
  },
  monthLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
    marginTop: 4,
  },
  emptyChart: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 60,
    opacity: 0.3,
  },
  emptyMessage: {
    fontSize: 16,
    color: "#999",
    marginTop: 10,
  },
  detailContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  detailCard: {
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#4a90e2",
  },
  detailMonth: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailItem: {
    flex: 1,
  },
  detailBalance: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  detailAmount: {
    fontSize: 14,
    fontWeight: "600",
  },
});
