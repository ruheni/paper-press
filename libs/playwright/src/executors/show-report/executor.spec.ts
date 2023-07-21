import { ShowReportExecutorSchema } from './schema';
import executor from './executor';

const options: ShowReportExecutorSchema = {};
const mockContext = {
  workspace: { projects: { foo: { root: 'libs/foo' } } },
  projectName: 'foo',
} as any;

describe('ShowReport Executor', () => {
  it.skip('can run', async () => {
    const output = await executor(options, mockContext);
    expect(output.success).toBe(true);
  });
});
