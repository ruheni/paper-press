import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration, readJson } from '@nrwl/devkit';

import generator from './generator';
import { PlaywrightProjectGeneratorSchema } from './schema';

describe('playwright generator', () => {
  let appTree: Tree;
  const options: PlaywrightProjectGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully with a given name', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();

    expect(appTree.exists('test/src/e2e/example.spec.ts')).toBeTruthy();
    expect(
      appTree.exists('test/src/test-examples/demo-todo.spec.ts')
    ).toBeTruthy();
    expect(appTree.exists('test/.eslintrc.json')).toBeTruthy();
    expect(appTree.exists('test/playwright.config.ts')).toBeTruthy();
    expect(appTree.exists('test/project.json')).toBeTruthy();
    const projectConfig = readJson(appTree, 'test/project.json');
    expect(projectConfig.targets.e2e).toBeDefined();
    expect(projectConfig.targets.debug).toBeDefined();
    expect(projectConfig.targets['show-report']).toBeDefined();
    expect(projectConfig.targets.lint).toBeDefined();
  });
});
