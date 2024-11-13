import { Badge, Button, Stepper, StepperProps, TextInput } from '@mantine/core'
import { useVerifyChallengeCli } from '@pubkey-link/web-identity-data-access'
import { UiCopy, UiGroup, useUiBreakpoints } from '@pubkey-ui/core'
import { PublicKey } from '@solana/web3.js'
import { IconCheck } from '@tabler/icons-react'
import { useMemo, useState } from 'react'
import { IdentityUiSolanaRequestChallengeCli } from './identity-ui-solana-request-challenge-cli'

export interface IdentityUiSolanaWizardCliProps extends Omit<StepperProps, 'children' | 'active'> {
  refresh: () => void
}

export function IdentityUiSolanaWizardCli({ refresh, ...props }: IdentityUiSolanaWizardCliProps) {
  const { isSm } = useUiBreakpoints()
  const [publicKeyInput, setPublicKeyInput] = useState('')
  const [challenge, setChallenge] = useState('')
  const [signature, setSignature] = useState('')
  const [verify, setVerify] = useState(false)
  const [signed, setSigned] = useState(false)

  const verifyMutation = useVerifyChallengeCli()
  const isValidPublicKey = useMemo(() => {
    if (!publicKeyInput) {
      return false
    }
    try {
      new PublicKey(publicKeyInput)
      return true
    } catch (e) {
      return false
    }
  }, [publicKeyInput])

  const active = useMemo(() => {
    if (!isValidPublicKey) {
      setSigned(false)
      return 0
    }
    if (!isValidPublicKey || !challenge.length || !verify) {
      setSigned(false)
      return 1
    }
    if (!signed) {
      return 2
    }
    return 3
  }, [isValidPublicKey, signed, verify, challenge])

  function Back() {
    return (
      <Button
        variant="light"
        size="lg"
        onClick={() => {
          setPublicKeyInput('')
          setChallenge('')
          setVerify(false)
        }}
      >
        Change Public Key
      </Button>
    )
  }

  return (
    <Stepper {...props} allowNextStepsSelect={false} active={active} orientation={isSm ? 'vertical' : 'horizontal'}>
      <Stepper.Step label="Enter public key">
        <PublicKeyInput publicKey={publicKeyInput} setPublicKey={setPublicKeyInput} />
        <UiGroup mt="md" justify="end">
          <Button disabled={!isValidPublicKey}>Next</Button>
        </UiGroup>
      </Stepper.Step>
      <Stepper.Step label="Sign message">
        <IdentityUiSolanaRequestChallengeCli providerId={publicKeyInput} setChallenge={setChallenge} />
        <UiGroup mt="md" align="start">
          <Back />
          <Button size="lg" onClick={() => setVerify(true)}>
            Verify
          </Button>
        </UiGroup>
      </Stepper.Step>
      <Stepper.Step label="Verify signature">
        <SignatureInput signature={signature} setSignature={setSignature} />
        <UiGroup mt="md" align="start">
          <Back />
          <UiGroup align="center" justify="stretch" w={isSm ? '100%' : undefined}>
            <Button
              disabled={!signature?.length}
              style={{ flexGrow: isSm ? 1 : undefined }}
              leftSection={<IconCheck />}
              size="lg"
              onClick={() => {
                verifyMutation.mutateAsync({ providerId: publicKeyInput, challenge, signature }).then((res) => {
                  if (res) {
                    setSigned(true)
                    refresh()
                  }
                })
              }}
            >
              Verify Signature
            </Button>
          </UiGroup>
        </UiGroup>
      </Stepper.Step>
      <Stepper.Completed>
        <UiGroup mt="md" align="start">
          <Back />
          <Badge size="xl" variant="light" color="green">
            Wallet verified
          </Badge>
        </UiGroup>
      </Stepper.Completed>
    </Stepper>
  )
}

function PublicKeyInput({ publicKey, setPublicKey }: { publicKey: string; setPublicKey: (publicKey: string) => void }) {
  const placeholder = `solana address -k ~/path/to/validator-keypair.json`
  return (
    <TextInput
      label="Public Key"
      description="Enter the public key of the wallet you want to link."
      value={publicKey}
      onChange={(e) => setPublicKey(e.target.value.trim())}
      placeholder={placeholder}
      rightSection={
        <UiCopy mr="xs" text={placeholder} tooltip="Copy command" size="sm" variant="light" color="brand" ml="xs" />
      }
    />
  )
}

function SignatureInput({ signature, setSignature }: { signature: string; setSignature: (signature: string) => void }) {
  return (
    <TextInput
      label="Signature"
      description="Enter the signature of the message you signed."
      value={signature}
      onChange={(e) => setSignature(e.target.value.trim())}
      placeholder="5dLPfwVK....8t4zxPak"
    />
  )
}
