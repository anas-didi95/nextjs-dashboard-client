import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Button from "../../../../../src/components/Button"
import ButtonGroup from "../../../../../src/components/ButtonGroup"
import ButtonLink from "../../../../../src/components/ButtonLink"
import Card from "../../../../../src/components/Card"
import Form from "../../../../../src/components/Form"
import FormInput from "../../../../../src/components/FormInput"
import LabelValue from "../../../../../src/components/LabelValue"
import Notification from "../../../../../src/components/Notification"
import AppLayout from "../../../../../src/layouts/AppLayout"
import DashboardLayout from "../../../../../src/layouts/DashboardLayout"
import LoadingContext from "../../../../../src/utils/contexts/LoadingContext"
import NotificationContext from "../../../../../src/utils/contexts/NotificationContext"
import useConstants from "../../../../../src/utils/hooks/useConstants"
import useSecurityService, { TUser } from "../../../../../src/utils/hooks/useSecurityService"

const SecurityUserEditPage: React.FC<{}> = () => (
  <AppLayout title="Security - User Edit" needAuth={true}>
    <DashboardLayout breadcrumbs={["Security", "User", "Edit"]}>
      <Notification />
      <UserEditForm />
      <br />
      <ActionButton />
    </DashboardLayout>
  </AppLayout>
)

const UserEditForm: React.FC<{}> = () => {
  type TForm = {
    email: string
    fullName: string
    telegramId: string
  }
  const [user, setUser] = useState<TUser>({
    email: "",
    fullName: "",
    id: "",
    lastModifiedDate: "",
    password: "",
    telegramId: "",
    username: "",
    version: -1
  })
  const { register, handleSubmit, errors, setValue } = useForm<TForm>()
  const securityService = useSecurityService()
  const constants = useConstants()
  const router = useRouter()
  const { id } = router.query
  const notificationContext = useContext(NotificationContext)
  const loadingContext = useContext(LoadingContext)

  const onUpdate = async (data: TForm) => {
    const updateUser: TUser = {
      id: user.id,
      email: data.email,
      fullName: data.fullName,
      lastModifiedDate: "",
      password: "",
      telegramId: data.telegramId,
      username: user.username,
      version: user.version
    }

    loadingContext.onLoading()
    notificationContext.clear()
    const responseBody = await securityService.updateUser(updateUser)
    loadingContext.offLoading()

    if (responseBody.status.isSuccess) {
      notificationContext.setSaveMessage(
        "Update user succeed.",
        responseBody.status.message,
        "is-success"
      )
      router.replace(`/dashboard/security/user/${id}/summary`)
    } else {
      notificationContext.setErrorMessage("Update user failed!", responseBody.status.message)
    }
  }

  useEffect(() => {
    (async () => {
      const user = await securityService.getUserById(id as string)

      setUser(user)
      setValue("email", user.email)
      setValue("fullName", user.fullName)
      setValue("telegramId", user.telegramId)
    })()
  }, [])

  return (
    <Card title="User Edit">
      <Form onSubmit={handleSubmit(onUpdate)}>
        <div className="columns is-multiline is-variable is-4">
          <div className="column is-6">
            <LabelValue label={constants.label.username}>{user.username}</LabelValue>
          </div>
          <div className="column is-6">
            <FormInput label={constants.label.email} name="email" register={register({
              required: constants.error.mandatoryField(constants.label.email)
            })} type="email" error={errors.email?.message} />
          </div>
          <div className="column is-6">
            <FormInput label={constants.label.fullName} name="fullName" register={register(
              { required: constants.error.mandatoryField(constants.label.fullName) }
            )} type="text" error={errors.fullName?.message} />
          </div>
          <div className="column is-6">
            <FormInput label={constants.label.telegramId} name="telegramId" register={register} type="text" error={errors.telegramId?.message} />
          </div>
        </div>
        <br />
        <ButtonGroup align="is-right">
          <Button label={constants.button.update} onClick={handleSubmit(onUpdate)} type="submit" color="is-success" />
        </ButtonGroup>
      </Form>
    </Card>
  )
}

const ActionButton: React.FC<{}> = () => {
  const constants = useConstants()
  const router = useRouter()
  const { id } = router.query

  return (
    <ButtonGroup align="is-right">
      <ButtonLink href={`/dashboard/security/user/${id}/summary`} label={constants.button.back} color="is-primary" />
    </ButtonGroup>
  )
}

export default SecurityUserEditPage
