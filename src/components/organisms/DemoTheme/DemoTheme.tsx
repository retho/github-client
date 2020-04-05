import React, { useCallback } from 'react';
import './style.scss';
import Switch from 'components/atoms/Switch';
import { useTheme } from 'utils/theme';
import { Theme } from 'store/slices/theme';

const lorem = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed turpis sagittis, vestibulum mauris non, scelerisque purus. Fusce scelerisque enim tellus, vitae hendrerit erat semper et. Nam nec pellentesque odio. Morbi vel sagittis ex, ac condimentum enim. Ut vel lorem faucibus diam viverra convallis eget ac elit. Fusce gravida vel felis id efficitur. Praesent eu sapien sed sapien viverra elementum eget vitae lacus. In hac habitasse platea dictumst. Donec tempor mollis elit, sit amet luctus nisl vehicula vitae.

Aenean iaculis gravida tellus, in tincidunt lacus scelerisque at. Duis vel augue eget arcu dapibus malesuada eget sit amet eros. Morbi vitae velit non arcu imperdiet faucibus. Integer tincidunt, odio in viverra facilisis, nunc massa auctor magna, imperdiet vestibulum elit arcu in nibh. Integer iaculis, velit vitae iaculis bibendum, est lorem porta nunc, vel vestibulum ipsum nisi vel ligula. Etiam auctor, lorem a laoreet pretium, augue sem commodo purus, scelerisque hendrerit magna metus consequat sem. Sed tempor risus nec lorem vulputate, cursus dapibus risus consequat. Vestibulum a dolor id sem lacinia feugiat. Mauris finibus lectus eget lacus vehicula tincidunt. Quisque sed nulla sapien. Cras pharetra egestas pretium. Ut condimentum erat ante, dictum dapibus eros posuere quis. Curabitur lacinia in ligula id ultrices. Phasellus sed consequat ligula, ut scelerisque eros. Duis et libero tincidunt enim euismod pretium.

Fusce bibendum neque eu ex euismod, sit amet placerat ligula egestas. Vivamus vitae diam malesuada, aliquet arcu ut, malesuada metus. Maecenas nisl sem, efficitur ut urna at, luctus pellentesque nibh. Nam cursus arcu at pharetra vulputate. Vivamus maximus massa sed massa ultricies pharetra. Nam aliquet fermentum orci vitae hendrerit. Pellentesque ante erat, tristique id vestibulum eu, tristique et lorem. Interdum et malesuada fames ac ante ipsum primis in faucibus.

Ut nec aliquam ante. Nulla at imperdiet mi, facilisis suscipit justo. Aenean malesuada tempor sem, in mollis metus facilisis et. Praesent nec pulvinar nisl. Phasellus pharetra placerat congue. Proin ut tristique metus, at mollis eros. Suspendisse porttitor velit et lacus tristique, ac vehicula lectus aliquam.

Donec ac dapibus nulla. Nunc dolor turpis, finibus in tempor vel, vehicula vitae enim. Integer tincidunt nunc at ex tincidunt congue. Pellentesque sit amet eros nec tortor cursus congue nec et massa. Sed ut venenatis lectus, finibus sodales sem. Morbi volutpat lectus et sodales laoreet. Sed ex elit, accumsan sit amet justo et, varius sollicitudin lectus. Maecenas pulvinar elit nunc, vitae commodo purus accumsan at. Nam vehicula dui eget lectus tincidunt, in congue orci ultricies. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nam nec interdum ipsum, at consectetur purus. Morbi euismod augue neque, eu euismod justo laoreet malesuada. Praesent vestibulum risus bibendum mollis rhoncus.
`
  .trim()
  .split('\n\n')
  .map((x, index) => <p key={index}>{x}</p>);

export interface IDemoThemeProps {}
const DemoTheme: React.FC<IDemoThemeProps> = () => {
  const [theme, setTheme] = useTheme();
  const handleThemeChange = useCallback(
    (checked: boolean) => setTheme(checked ? Theme.dark : Theme.light),
    []
  );

  return (
    <div className="DemoTheme">
      <div className="DemoTheme__content">
        <div className="DemoTheme__theme-toggler">
          light&nbsp;
          <Switch
            checked={theme !== Theme.light}
            onChange={handleThemeChange}
            checkedIcon={<span />}
            uncheckedIcon={<span />}
            onColor="#888"
            offColor="#888"
          />
          &nbsp;dark
        </div>
        {lorem}
      </div>
    </div>
  );
};

export default DemoTheme;
