import { useRouter } from "next/dist/client/router"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Button from "../../../../../src/components/Button"
import ButtonGroup from "../../../../../src/components/ButtonGroup"
import ButtonLink from "../../../../../src/components/ButtonLink"
import Card from "../../../../../src/components/Card"
import FormInput from "../../../../../src/components/FormInput"
import AppLayout from "../../../../../src/layouts/AppLayout"
import DashboardLayout from "../../../../../src/layouts/DashboardLayout"
import { useAuthContext } from "../../../../../src/utils/contexts/AuthContext"
import useConstants from "../../../../../src/utils/hooks/useConstants"

const SecurityUserChangePassword: React.FC<{}> = () => (
  <AppLayout title="Security - User Change Password" needAuth>
    <DashboardLayout breadcrumbs={["Security", "User", "Change Password"]}>
      <ChangePasswordCard />
      <br />
      <ActionButton />
    </DashboardLayout>
  </AppLayout>
)

const ChangePasswordCard: React.FC<{}> = () => {
  const constants = useConstants()
  const authContext = useAuthContext()
  const router = useRouter()
  const { id } = router.query
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TForm>()
  const [isUser, setUser] = useState<boolean>(false)

  const onSubmit = (data: TForm) => console.log("[onSubmit] data", data)
  const onClear = () => reset()

  useEffect(() => {
    setUser(authContext.getClaim().userId === id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card title={constants.header.changePassword}>
      {isUser ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="columns is-multiline is-variable is-4">
            <div className="column is-6">
              <FormInput
                label={constants.label.oldPassword}
                type="password"
                error={errors.oldPassword?.message}
                register={register("oldPassword", {
                  required: constants.message.mandatoryField(
                    constants.label.oldPassword
                  ),
                })}
              />
            </div>
            <div className="column is-hidden-mobile" />
            <div className="column is-6">
              <FormInput
                label={constants.label.newPassword}
                type="password"
                error={errors.newPassword?.message}
                register={register("newPassword", {
                  required: constants.message.mandatoryField(
                    constants.label.newPassword
                  ),
                })}
              />
            </div>
            <div className="column is-6">
              <FormInput
                label={constants.label.confirmPassword}
                type="password"
                error={errors.confirmPassword?.message}
                register={register("confirmPassword", {
                  validate: (value) =>
                    value === watch().newPassword ||
                    constants.message.passwordNotMatched,
                })}
              />
            </div>
          </div>
          <br />
          <ButtonGroup align="is-right">
            <Button
              label={constants.button.clear}
              type="button"
              color="is-light"
              isInverted
              isOutlined
              onClick={onClear}
            />
            <Button
              label={constants.button.changePassword}
              type="submit"
              color="is-success"
              onClick={handleSubmit(onSubmit)}
            />
          </ButtonGroup>
        </form>
      ) : (
        <p className="content">You cannot change password for another user!</p>
      )}
    </Card>
  )
}

const ActionButton: React.FC<{}> = () => {
  const constants = useConstants()
  const router = useRouter()
  const { id } = router.query

  return (
    <ButtonGroup align="is-right">
      <ButtonLink
        label={constants.button.back}
        color="is-primary"
        href={`/dashboard/security/user/${id}`}
      />
    </ButtonGroup>
  )
}

export default SecurityUserChangePassword

type TForm = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}
