import React from 'react';
import { Card, List, Icon, Button } from 'semantic-ui-react';

const PlanCardFree = () => {
  return (
    <>
      <div className='price-panel'>
        <div>header</div>
        <div>toggle</div>
      </div>
      <hr />
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
                    <List.Header>Basic School/District Profile</List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Icon name='check' />
                  <List.Content>
                    <List.Header>Connect to Local SPED Grads</List.Header>
                  </List.Content>
                </List.Item>
              </List>
            </Card.Description>
          </Card.Content>
        </Card>
        <Card className='plan-free'>
          <Card.Content>
            <Card.Header>
              <div>FREE</div>
              <h1>$250 - $2000/mo</h1>
              <Button>Get Started</Button>
            </Card.Header>
            <Card.Description>
              <List>
                <List.Item>
                  <Icon name='check' />
                  <List.Content>
                    <List.Header>Basic School/District Profile</List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Icon name='check' />
                  <List.Content>
                    <List.Header>Connect to Local SPED Grads</List.Header>
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
