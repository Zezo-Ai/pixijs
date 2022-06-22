import { Texture, RenderTexture, extensions } from '@pixi/core';
import { Sprite } from '@pixi/sprite';
import { CanvasRenderer } from '@pixi/canvas-renderer';
import { NineSlicePlane } from '@pixi/mesh-extras';
import '@pixi/canvas-display';
import { CanvasSpriteRenderer } from '@pixi/canvas-sprite';
import { CanvasMeshRenderer } from '@pixi/canvas-mesh';
import { expect } from 'chai';

describe('NineSlicePlane', () =>
{
    let renderer: CanvasRenderer;

    before(() =>
    {
        extensions.add(CanvasSpriteRenderer, CanvasMeshRenderer);
        renderer = new CanvasRenderer();
    });

    after(() =>
    {
        extensions.remove(CanvasSpriteRenderer, CanvasMeshRenderer);
        renderer.destroy();
        renderer = null;
    });

    it('should be renderable with renderTexture in canvas', () =>
    {
        const rt = RenderTexture.create({ width: 10, height: 10 });
        const spr = new Sprite(Texture.WHITE);
        const renderer = new CanvasRenderer({ width: 12, height: 12 });

        renderer.render(spr, { renderTexture: rt });

        const nineSlicePlane = new NineSlicePlane(rt, 1, 1, 1, 1);

        expect(() => { renderer.render(nineSlicePlane); }).to.not.throw();
    });
});