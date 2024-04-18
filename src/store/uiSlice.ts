import { createSlice } from '@reduxjs/toolkit'
import type { UiState } from '@student/types/UiState'
import { RootState } from './store'

const initialState: UiState = {
  activeLoginDrawer: false,
  activeSyllabusPopup: false,
  syllabusPopupData: {},
  sideNavigationData: {
    uri: '',
    query: {
      meeting_id: '',
    },
  },
  isLoggedIn: false,
  activeEnrolNowDrawer: false,
  enrolNowDrawerData: {},
  forwardAction: null,
  isSideNavigationOpen: false,
  activeOnboardingPopup: false,
  activeDialogPopup: false,
  dialogPopupData: {},
  activeToastPopup: false,
  toastPopupData: {},
  activeEditAddressPopup: false,
  editAddressPopupData: {},
  showPostPurchasePopup: false,
  activeOrderIds: '',
  vodData: {
    url: '',
    watermark: '',
    thumbnail_url: '',
  },
  activeGeneralPopup: false,
  generalPopupData: {},
  activeOtpPopup: false,
  otpPopupData: {},
  bottomSheetData: {
    isActive: false,
  },
  // homeworkBottomSheetData: {
  //   isActive: false,
  //   data: {},
  // },
  pdfViewerData: {
    uri: '',
  },
  showFileInputPopup: false,
  fileInputPopupData: {},
}

export const uiSlice = createSlice({
  name: 'uiSlice',
  initialState,
  reducers: {
    closeAllDrawer(state) {
      // Close Active Login Drawer
      state.activeLoginDrawer = false

      // Close Enrol Now Drawer
      state.activeEnrolNowDrawer = false

      // Close Preclass Drawer
      state.isSideNavigationOpen = false
      state.enrolNowDrawerData = {}
    },
    closeAllPopup(state) {
      // Close Syllabus popup
      state.activeSyllabusPopup = false
      state.syllabusPopupData = {}

      // Close onboarding popup
      state.activeOnboardingPopup = false

      // Close Dialog popup
      state.activeDialogPopup = false
      state.dialogPopupData = {}

      // Close Edit address popup
      state.activeEditAddressPopup = false
      state.editAddressPopupData = {}

      // Close General Popup
      state.activeGeneralPopup = false
      state.generalPopupData = {}

      // Close Otp Popup
      state.activeOtpPopup = false
      state.otpPopupData = {}

      //Close fileinputpopup
      state.showFileInputPopup = false
      state.fileInputPopupData = {}

      //homework Bottom Sheet
      // state.homeworkBottomSheetData = { isActive: false, data: {} }
    },
    showLoginDrawer(state) {
      state.activeLoginDrawer = true
    },
    showSideNavigation(state, action) {
      const { payload } = action
      state.sideNavigationData = payload?.data
      state.isSideNavigationOpen = true
    },
    closeSideNavigation(state) {
      state.isSideNavigationOpen = false
    },
    updateVodData(state, action) {
      const { payload } = action
      state.vodData = payload
    },
    closeLoginDrawer(state) {
      state.activeLoginDrawer = false
    },
    showSyllabusPopup(state, action) {
      const { payload } = action
      state.activeSyllabusPopup = true
      state.syllabusPopupData = payload?.data
    },
    closeSyllabusPopup(state) {
      state.activeSyllabusPopup = false
      state.syllabusPopupData = {}
    },
    setLogin(state, action) {
      state.isLoggedIn = action.payload
    },
    showEnrolNowDrawer(state, action) {
      const { payload } = action
      state.activeEnrolNowDrawer = true
      state.enrolNowDrawerData = payload?.data
    },
    closeEnrolNowDrawer(state) {
      state.activeEnrolNowDrawer = false
      state.enrolNowDrawerData = {}
    },
    setForwardAction(state, action) {
      const { payload } = action
      if (payload) {
        state.forwardAction = payload
      }
    },
    clearForwardAction(state) {
      state.forwardAction = null
    },
    showOnboardingPopup(state) {
      state.activeOnboardingPopup = true
    },
    closeOnboardingPopup(state) {
      state.activeOnboardingPopup = false
    },
    showDialogPopup(state, action) {
      state.activeDialogPopup = true
      state.dialogPopupData = action?.payload
    },
    closeDialogPopup(state) {
      state.activeDialogPopup = false
      state.dialogPopupData = {}
    },
    showToastPopup(state, action) {
      console.log(action)
      state.activeToastPopup = !state.activeToastPopup
      state.toastPopupData = action?.payload
    },
    showEditAddressPopup(state, action) {
      state.activeEditAddressPopup = true
      state.editAddressPopupData = action?.payload
    },
    closeEditAddressPopup(state) {
      state.activeEditAddressPopup = false
      state.editAddressPopupData = {}
    },
    showPostPurchasePopup(state, action) {
      state.showPostPurchasePopup = true
      state.activeOrderIds = action?.payload.order_id
    },
    hidePostPurchasePopup(state) {
      state.showPostPurchasePopup = false
    },
    clearOrderIds(state) {
      state.activeOrderIds = ''
    },
    resetUiSlice(state) {
      Object.assign(state, initialState)
    },
    showGeneralPopup(state, action) {
      state.activeGeneralPopup = true
      state.generalPopupData = action?.payload
    },
    closeGeneralPopup(state) {
      state.activeGeneralPopup = false
      state.generalPopupData = {}
    },
    showOtpPopup(state, action) {
      state.activeOtpPopup = true
      state.otpPopupData = action?.payload
    },
    closeOtpPopup(state) {
      state.activeOtpPopup = false
      state.otpPopupData = {}
    },
    showBottomSheet(state, action) {
      state.bottomSheetData = {
        isActive: true,
        ...action.payload,
      }
    },
    closeBottomSheet(state) {
      state.bottomSheetData = {
        isActive: false,
      }
    },
    // showHomeworkBottomSheet(state, action) {
    //   state.homeworkBottomSheetData = {
    //     isActive: true,
    //     data: { ...action.payload },
    //   }
    // },
    // closeHomeworkBottomSheet(state) {
    //   state.homeworkBottomSheetData = {
    //     isActive: false,
    //     data: {},
    //   }
    // },
    setPdfViewerData(state, action) {
      state.pdfViewerData = { ...action.payload }
    },
    showFileDialogPopup(state, action) {
      const { payload } = action
      state.showFileInputPopup = !state.showFileInputPopup
      state.fileInputPopupData = payload?.data
    },
    closeFileInputPopup(state) {
      state.showFileInputPopup = false
      state.fileInputPopupData = {}
    },
  },
})

export const {
  closeAllDrawer,
  closeAllPopup,
  showLoginDrawer,
  closeLoginDrawer,
  showSyllabusPopup,
  closeSyllabusPopup,
  setLogin,
  showEnrolNowDrawer,
  closeEnrolNowDrawer,
  setForwardAction,
  clearForwardAction,
  showSideNavigation,
  closeSideNavigation,
  showOnboardingPopup,
  closeOnboardingPopup,
  showDialogPopup,
  showToastPopup,
  closeDialogPopup,
  showEditAddressPopup,
  closeEditAddressPopup,
  showPostPurchasePopup,
  hidePostPurchasePopup,
  clearOrderIds,
  updateVodData,
  resetUiSlice,
  showGeneralPopup,
  closeGeneralPopup,
  showOtpPopup,
  closeOtpPopup,
  showBottomSheet,
  closeBottomSheet,
  // showHomeworkBottomSheet,
  // closeHomeworkBottomSheet,
  showFileDialogPopup,
  closeFileInputPopup,
} = uiSlice.actions
export const activeLoginDrawer = (state: RootState) => state.uiSlice.activeLoginDrawer
export const activeSyllabusPopup = (state: RootState) => state.uiSlice.activeSyllabusPopup
export const syllabusPopupData = (state: RootState) => state.uiSlice.syllabusPopupData
export const isLoggedIn = (state: RootState) => state.uiSlice.isLoggedIn
export const activeEnrolNowDrawer = (state: RootState) => state.uiSlice.activeEnrolNowDrawer
export const enrolNowDrawerData = (state: RootState) => state.uiSlice.enrolNowDrawerData
export const forwardActionData = (state: RootState) => state.uiSlice.forwardAction
export const isSideNavigationOpen = (state: RootState) => state.uiSlice.isSideNavigationOpen
export const vodData = (state: RootState) => state.uiSlice.vodData
export const sideNavigationData = (state: RootState) => state.uiSlice.sideNavigationData
export const activeOnboardingPopup = (state: RootState) => state.uiSlice.activeOnboardingPopup
export const activeDialogPopup = (state: RootState) => state.uiSlice.activeDialogPopup
export const getDialogPopupData = (state: RootState) => state.uiSlice.dialogPopupData
export const activeToastPopup = (state: RootState) => state.uiSlice.activeToastPopup
export const getToastPopupData = (state: RootState) => state.uiSlice.toastPopupData
export const activeEditAddressPopup = (state: RootState) => state.uiSlice.activeEditAddressPopup
export const getEditAddressPopupData = (state: RootState) => state.uiSlice.editAddressPopupData
export const getIsPostPurchasePopupActive = (state: RootState) =>
  state.uiSlice.showPostPurchasePopup

export const getActiveOrderIds = (state: RootState) => state.uiSlice.activeOrderIds
export const activeGeneralPopup = (state: RootState) => state.uiSlice.activeGeneralPopup
export const getGeneralPopupData = (state: RootState) => state.uiSlice.generalPopupData
export const activeOtpPopup = (state: RootState) => state.uiSlice.activeOtpPopup
export const getOtpPopupData = (state: RootState) => state.uiSlice.otpPopupData
export const getBottomSheetData = (state: RootState) => state.uiSlice.bottomSheetData
// export const getHomeworkBottomSheetData = (state: RootState) =>
//   state.uiSlice.homeworkBottomSheetData
export const getPdfViewerData = (state: RootState) => state.uiSlice.pdfViewerData
export const showFileInputPopup = (state: RootState) => state.uiSlice.showFileInputPopup
export const getFileInputPopupData = (state: RootState) => state.uiSlice.fileInputPopupData

export default uiSlice.reducer
