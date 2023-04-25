import { FormHandles } from '@unform/core'
import { useCallback, useRef } from 'react'

/**
 * hook para ações do formulário
 */

export const useVForm = () => {
  const formRef = useRef<FormHandles>(null)

  const isSavingAndNew = useRef(false)
  const isSavingAndClose = useRef(false)

  const triggerSave = useCallback(() => {
    isSavingAndClose.current = false
    isSavingAndNew.current = false

    formRef.current?.submitForm()
  }, [])
  const triggerSaveAndNew = useCallback(() => {
    isSavingAndClose.current = false
    isSavingAndNew.current = true

    formRef.current?.submitForm()
  }, [])
  const triggerSaveAndClose = useCallback(() => {
    isSavingAndClose.current = true
    isSavingAndNew.current = false

    formRef.current?.submitForm()
  }, [])
  const triggerIsSaveAndNew = useCallback(() => {
    return isSavingAndNew.current
  }, [])
  const triggerIsSaveAndClose = useCallback(() => {
    return isSavingAndClose.current
  }, [])

  return {
    formRef,
    save: triggerSave,
    saveAndNew: triggerSaveAndNew,
    saveAndClose: triggerSaveAndClose,
    isSaveAndNew: triggerIsSaveAndNew,
    isSaveAndClose: triggerIsSaveAndClose,
  }
}
