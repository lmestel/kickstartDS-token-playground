import { FC, useEffect, useMemo } from "react";
import { FormProvider, useController, useForm } from "react-hook-form";
import deepmerge from "deepmerge";
import tinycolor from "tinycolor2";
import { ITokenContext } from "../../token/TokenContext";

const ColorControl: FC<{ name: string; title: string }> = ({ name, title }) => {
  const { field } = useController({ name });
  return (
    <>
      <dt>{title}</dt>
      <dd>
        <input type="color" {...field} />
      </dd>
    </>
  );
};

export const ColorsEditor: FC<ITokenContext> = ({ tokens, setTokens }) => {
  console.log(tokens.color);
  const defaultValues = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(tokens.color as Record<string, string>).map(
          ([key, value]) => [key, tinycolor(value).toHexString()]
        )
      ),
    []
  );
  const methods = useForm({ defaultValues });

  useEffect(
    () =>
      methods.watch((color) =>
        setTokens((prevTokens: any) => deepmerge(prevTokens, { color }))
      ).unsubscribe,
    [methods.watch]
  );

  return (
    <FormProvider {...methods}>
      <dl>
        <ColorControl title="Primary" name="primary" />
        <ColorControl title="Background" name="background" />
        <ColorControl title="Foreground" name="foreground" />
        <ColorControl title="Link" name="link" />
      </dl>
    </FormProvider>
  );
};
