import { Img } from '../components';

export interface TemplateImageProps {
  assetBaseUrl: string;
  className?: string;
  staticAsset: string;
}

export const TemplateImage = ({ assetBaseUrl, className, staticAsset }: TemplateImageProps) => {
  const getAssetUrl = (path: string) => {
    return new URL(path, assetBaseUrl).toString();
  };

  return <Img className={className} src={'https://ibb.co/f0T5w3j'} />;
};

export default TemplateImage;
