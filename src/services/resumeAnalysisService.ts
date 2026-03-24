import api from '@/lib/api'
import logger from '@/lib/logger'

const log = logger('RESUME_SERVICE')

export interface ResumeAnalysisService {
    uploadAndAnalyzeResume: (file: File, targetRoles?: string[]) => Promise<{ data?: any, error?: any }>
    getLatestAnalysis: () => Promise<{ data?: any, error?: any }>
    getScoreBreakdown: () => Promise<{ data?: any, error?: any }>
    improveBullet: (bullet: string, targetRoles?: string[]) => Promise<{ data?: any, error?: any }>
}

const resumeAnalysisService = {
    async uploadAndAnalyzeResume(file: File, targetRoles?: string[]) {
        log.info('uploadAndAnalyzeResume starting...')
        const formData = new FormData()
        formData.append('file', file)
        if (targetRoles && targetRoles.length > 0) {
            targetRoles.forEach(role => formData.append('target_roles', role))
        }

        try {
            const { data } = await api.post('/api/v1/resume/analyze', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            return { data }
        } catch (error: any) {
            log.error('uploadAndAnalyzeResume failed', error)
            return { error: error.response?.data || error.message }
        }
    },

    async getLatestAnalysis() {
        log.info('getLatestAnalysis starting...')
        try {
            const { data } = await api.get('/api/v1/resume/analysis')
            return { data }
        } catch (error: any) {
            log.error('getLatestAnalysis failed', error)
            return { error: error.response?.data || error.message }
        }
    },

    async getScoreBreakdown() {
        log.info('getScoreBreakdown starting...')
        try {
            const { data } = await api.get('/api/v1/resume/score-breakdown')
            return { data }
        } catch (error: any) {
            log.error('getScoreBreakdown failed', error)
            return { error: error.response?.data || error.message }
        }
    },

    async improveBullet(bullet: string, targetRoles?: string[]) {
        log.info('improveBullet starting...')
        try {
            const { data } = await api.post('/api/v1/resume/improve-bullet', {
                bullet: bullet,
                target_roles: targetRoles && targetRoles.length > 0 ? targetRoles : null
            })
            return { data }
        } catch (error: any) {
            log.error('improveBullet failed', error)
            return { error: error.response?.data || error.message }
        }
    }
}

export default resumeAnalysisService
