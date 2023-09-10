import { ref } from 'vue'
import type { Doctor, FollowType } from '@/types/consult'
import { likeDoctor } from '@/services/consult'

export default function useFollowDoctor(type: FollowType = 'doc') {
  const loading = ref(false)
  const followDoctor = async (obj: { id: string; likeFlag: 0 | 1 }) => {
    loading.value = true
    try {
      await likeDoctor({ id: obj.id, type })
      obj.likeFlag = obj.likeFlag === 1 ? 0 : 1
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    followDoctor
  }
}
