import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Button from "../../../../../src/components/Button"
import ButtonGroup from "../../../../../src/components/ButtonGroup"
import ButtonLink from "../../../../../src/components/ButtonLink"
import Card from "../../../../../src/components/Card"
import Form from "../../../../../src/components/Form"
import FormInput from "../../../../../src/components/FormInput"
import LabelValue from "../../../../../src/components/LabelValue"
import AppLayout from "../../../../../src/layouts/AppLayout"
import DashboardLayout from "../../../../../src/layouts/DashboardLayout"
import useConstants from "../../../../../src/utils/hooks/useConstants"
import useSecurityService, { TUser } from "../../../../../src/utils/hooks/useSecurityService"

const SecurityUserEditPage: React.FC<{}> = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <AppLayout title="Security - User Edit" needAuth={true}>
      <DashboardLayout breadcrumbs={["Security", "User", "Edit"]}>
        <UserEditForm id={id as string} />
        <br />
        <ActionButton id={id as string} />
      </DashboardLayout>
    </AppLayout>
  )
}

const UserEditForm: React.FC<{ id: string }> = ({ id }) => {
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

    const responseBody = await securityService.updateUser(updateUser)

    console.log("responseBody", responseBody)
  }

  useEffect(() => {
    (async () => {
      const user = await securityService.getUserById(id)

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

const ActionButton: React.FC<{ id: string }> = ({ id }) => {
  const constants = useConstants()

  return (
    <ButtonGroup align="is-right">
      <ButtonLink href={`/dashboard/security/user/${id}/summary`} label={constants.button.back} color="is-primary" />
    </ButtonGroup>
  )
}

export default SecurityUserEditPage
