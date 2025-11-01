import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL_KEY = 'EXPENSE_API_URL';
const DEFAULT_API_URL = 'https://69063d61ee3d0d14c1354b6c.mockapi.io/Expense';

// Lấy API URL từ storage
export const getApiUrl = async (): Promise<string> => {
  try {
    const url = await AsyncStorage.getItem(API_URL_KEY);
    return url || DEFAULT_API_URL;
  } catch (error) {
    console.error('Lỗi khi lấy API URL:', error);
    return DEFAULT_API_URL;
  }
};

// Lưu API URL vào storage
export const saveApiUrl = async (url: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(API_URL_KEY, url);
  } catch (error) {
    console.error('Lỗi khi lưu API URL:', error);
    throw error;
  }
};

// Lấy tất cả expenses từ API
export const getAllExpensesFromApi = async (): Promise<any[]> => {
  try {
    const apiUrl = await getApiUrl();
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu từ API:', error);
    throw error;
  }
};

// Xóa một expense trên API
export const deleteExpenseFromApi = async (id: string): Promise<void> => {
  try {
    const apiUrl = await getApiUrl();
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Lỗi khi xóa expense từ API:', error);
    throw error;
  }
};

// Thêm một expense lên API
export const addExpenseToApi = async (expense: {
  title: string;
  amount: number;
  type: string;
  createdAt: string;
}): Promise<void> => {
  try {
    const apiUrl = await getApiUrl();
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expense),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Lỗi khi thêm expense lên API:', error);
    throw error;
  }
};

// Xóa toàn bộ data trên API
export const deleteAllExpensesFromApi = async (): Promise<void> => {
  try {
    const expenses = await getAllExpensesFromApi();
    // Xóa từng item
    for (const expense of expenses) {
      await deleteExpenseFromApi(expense.id);
    }
  } catch (error) {
    console.error('Lỗi khi xóa toàn bộ data từ API:', error);
    throw error;
  }
};

// Đồng bộ toàn bộ data từ SQLite lên API
export const syncToApi = async (expenses: any[]): Promise<void> => {
  try {
    // Bước 1: Xóa toàn bộ data trên API
    await deleteAllExpensesFromApi();
    
    // Bước 2: Upload từng expense lên API
    for (const expense of expenses) {
      await addExpenseToApi({
        title: expense.title,
        amount: expense.amount,
        type: expense.type,
        createdAt: expense.createdAt,
      });
    }
  } catch (error) {
    console.error('Lỗi khi đồng bộ data lên API:', error);
    throw error;
  }
};

