import { useRouter } from "next/router"
import React, { useState } from "react"
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
import { TUser } from "../../../../../src/utils/hooks/useSecurityService"

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
  const { register, handleSubmit, errors } = useForm<TForm>()

  const onUpdate = async (data: TForm) => {
    console.log("data", data)
  }

  return (
    <Card title="User Edit">
      <Form onSubmit={handleSubmit(onUpdate)}>
        <div className="columns is-multiline is-variable is-4">
          <div className="column is-6">
            <LabelValue label="Username">{user.username}</LabelValue>
          </div>
          <div className="column is-6">
            <FormInput label="Email" name="email" register={register} type="email" error={errors.email?.message} />
          </div>
          <div className="column is-6">
            <FormInput label="Full Name" name="fullName" register={register} type="text" error={errors.fullName?.message} />
          </div>
          <div className="column is-6">
            <FormInput label="Telegram Id" name="telegramId" register={register} type="text" error={errors.telegramId?.message} />
          </div>
        </div>
        <br />
        <ButtonGroup align="is-right">
          <Button label="Update" onClick={handleSubmit(onUpdate)} type="submit" color="is-success" />
        </ButtonGroup>
      </Form>
    </Card>
  )
}

const ActionButton: React.FC<{ id: string }> = ({ id }) => (
  <ButtonGroup align="is-right">
    <ButtonLink href={`/dashboard/security/user/${id}/summary`} label="Back" color="is-primary" />
  </ButtonGroup>
)

export default SecurityUserEditPage
