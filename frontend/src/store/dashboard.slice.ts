import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DashboardAPI } from '../services/dashboard.api';
import { DashboardStatsResponse, TrendResponse, QuickAccessResponse, ActivityResponse, ModelRecommendationResponse, DatasetLatestResponse, CaseFeaturedResponse, CapabilityRecommendationResponse } from '../types/dashboard';

export interface DashboardState {
  loading: boolean;
  error: string | null;
  stats: DashboardStatsResponse | null;
  trends: TrendResponse | null;
  quickAccess: QuickAccessResponse | null;
  recentActivities: ActivityResponse | null;
  modelRecommendations: ModelRecommendationResponse | null;
  newDatasets: DatasetLatestResponse | null;
  featuredCases: CaseFeaturedResponse | null;
  capabilityRecommendations: CapabilityRecommendationResponse | null;
}

const initialState: DashboardState = {
  loading: false,
  error: null,
  stats: null,
  trends: null,
  quickAccess: null,
  recentActivities: null,
  modelRecommendations: null,
  newDatasets: null,
  featuredCases: null,
  capabilityRecommendations: null,
};

export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async () => {
    const response = await DashboardAPI.getStats();
    return response;
  }
);

export const fetchDashboardTrends = createAsyncThunk(
  'dashboard/fetchTrends',
  async (range: string) => {
    const response = await DashboardAPI.getTrends(range);
    return response;
  }
);

export const fetchQuickAccess = createAsyncThunk(
  'dashboard/fetchQuickAccess',
  async () => {
    const response = await DashboardAPI.getQuickAccess();
    return response;
  }
);

export const fetchRecentActivities = createAsyncThunk(
  'dashboard/fetchRecentActivities',
  async ({ pageNum, pageSize }: { pageNum: number; pageSize: number }) => {
    const response = await DashboardAPI.getRecentActivities(pageNum, pageSize);
    return response;
  }
);

export const fetchModelRecommendations = createAsyncThunk(
  'dashboard/fetchModelRecommendations',
  async ({ type, limit }: { type?: string; limit?: number }) => {
    const response = await DashboardAPI.getModelRecommendations(type, limit);
    return response;
  }
);

export const fetchNewDatasets = createAsyncThunk(
  'dashboard/fetchNewDatasets',
  async (limit?: number) => {
    const response = await DashboardAPI.getNewDatasets(limit);
    return response;
  }
);

export const fetchFeaturedCases = createAsyncThunk(
  'dashboard/fetchFeaturedCases',
  async (limit?: number) => {
    const response = await DashboardAPI.getFeaturedCases(limit);
    return response;
  }
);

export const fetchCapabilityRecommendations = createAsyncThunk(
  'dashboard/fetchCapabilityRecommendations',
  async ({ type, limit }: { type?: string; limit?: number }) => {
    const response = await DashboardAPI.getCapabilityRecommendations(type, limit);
    return response;
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '获取统计数据失败';
      })
      .addCase(fetchDashboardTrends.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardTrends.fulfilled, (state, action) => {
        state.loading = false;
        state.trends = action.payload;
      })
      .addCase(fetchDashboardTrends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '获取趋势数据失败';
      })
      .addCase(fetchQuickAccess.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuickAccess.fulfilled, (state, action) => {
        state.loading = false;
        state.quickAccess = action.payload;
      })
      .addCase(fetchQuickAccess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '获取快速访问数据失败';
      })
      .addCase(fetchRecentActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecentActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.recentActivities = action.payload;
      })
      .addCase(fetchRecentActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '获取最近活动失败';
      })
      .addCase(fetchModelRecommendations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchModelRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.modelRecommendations = action.payload;
      })
      .addCase(fetchModelRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '获取模型推荐失败';
      })
      .addCase(fetchNewDatasets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewDatasets.fulfilled, (state, action) => {
        state.loading = false;
        state.newDatasets = action.payload;
      })
      .addCase(fetchNewDatasets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '获取最新数据集失败';
      })
      .addCase(fetchFeaturedCases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedCases.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredCases = action.payload;
      })
      .addCase(fetchFeaturedCases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '获取精选案例失败';
      })
      .addCase(fetchCapabilityRecommendations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCapabilityRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.capabilityRecommendations = action.payload;
      })
      .addCase(fetchCapabilityRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '获取AI能力推荐失败';
      });
  },
});

export default dashboardSlice.reducer;
