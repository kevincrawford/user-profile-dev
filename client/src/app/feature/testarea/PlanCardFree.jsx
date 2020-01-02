import React from 'react';
import { Card, List, Icon, Button } from 'semantic-ui-react';

const PlanCardFree = () => {
  return (
    <>
      <h1 className='mb-5'>Pricing</h1>
      <Card.Group>
        <Card className='plan-free'>
          <Card.Content>
            <Card.Header>
              <div>FREE</div>
              <h1>$0</h1>
              <Button>Get Started</Button>
            </Card.Header>
            <Card.Description>
              <List>
                <List.Item>
                  <Icon name='check' />
                  <List.Content>
                    <List.Header>Featured Schools Profile</List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Icon name='check' />
                  <List.Content>
                    <List.Header>Local SPED Grad Outreach</List.Header>
                  </List.Content>
                </List.Item>
              </List>
            </Card.Description>
          </Card.Content>
        </Card>
        <Card className='plan-free'>
          <Card.Content>
            <Card.Header>
              <div>UNLIMITED JOBS</div>
              <h1>$250/mo</h1>
              <Button>Get Started</Button>
            </Card.Header>
            <Card.Description>
              <List>
                <List.Item>
                  <Icon name='check' />
                  <List.Content>
                    <List.Header>Featured Schools Profile</List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Icon name='check' />
                  <List.Content>
                    <List.Header>Featured Schools Profile Landing Page</List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Icon name='check' />
                  <List.Content>
                    <List.Header>Unlimited Job Posts</List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Icon name='check' />
                  <List.Content>
                    <List.Header>Up to 5 Administrators</List.Header>
                  </List.Content>
                </List.Item>
              </List>
            </Card.Description>
          </Card.Content>
        </Card>
        <Card className='plan-free'>
          <Card.Content>
            <Card.Header>
              <div>ENTERPRISE</div>
              <h1>$2500/mo</h1>
              <Button>Get a Quote</Button>
            </Card.Header>
            <Card.Description>
              <List>
                <List.Item>
                  <Icon name='check' />
                  <List.Content>
                    <List.Header>Featured Schools Profile</List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Icon name='check' />
                  <List.Content>
                    <List.Header>National SPED Grad Outreach</List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Icon name='check' />
                  <List.Content>
                    <List.Header>Promotional Landing Page</List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Icon name='check' />
                  <List.Content>
                    <List.Header>Unlimited Job Posts</List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Icon name='check' />
                  <List.Content>
                    <List.Header>Unlimited Job Administrators</List.Header>
                  </List.Content>
                </List.Item>
              </List>
            </Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>
    </>
  );
};

export default PlanCardFree;
